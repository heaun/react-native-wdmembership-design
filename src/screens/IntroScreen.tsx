import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Animated, Image } from "react-native";

interface IntroScreenProps {
  onSignupPress?: () => void;
  onLoginPress?: () => void;
}

const { width, height } = Dimensions.get("window");

const images = [
  {
    id: 1,
    color: "#F5F5F5",
    imageName: "intro_01.png",
    imageSource: require("../assets/intro/intro_01.png"),
    text: "철저한 보안 시스템,\n독립된 프라이빗\n고급 주거 공간",
    align: "left"
  },
  {
    id: 2,
    color: "#E8F4FD",
    imageName: "intro_02.png",
    imageSource: require("../assets/intro/intro_02.png"),
    text: "입주자를 위한\n맞춤형\n컨시어지 서비스",
    align: "right"
  },
  {
    id: 3,
    color: "#F0F8F0",
    imageName: "intro_03.png",
    imageSource: require("../assets/intro/intro_03.png"),
    text: "차별화된\n프리미엄\n라이프스타일",
    align: "left"
  }
];

export const IntroScreen: React.FC<IntroScreenProps> = ({ onSignupPress, onLoginPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isScrolling) {
        const nextIndex = (currentIndex + 1) % images.length;

        // ScrollView도 함께 이동
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true
        });

        // 페이드 아웃
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(() => {
          // 페이드 인
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }).start();
        });

        // 인디케이터 업데이트를 애니메이션 완료 후에 실행
        setTimeout(() => {
          setCurrentIndex(nextIndex);
        }, 300);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, fadeAnim, isScrolling]);

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
  };

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }

    setIsScrolling(false);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* 이미지 롤링 영역 */}
      <View style={styles.imageContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          decelerationRate="fast"
        >
          {images.map((image, index) => (
            <View key={image.id} style={styles.imageSlide}>
              <Image source={image.imageSource} style={styles.backgroundImage} resizeMode="cover" />
              <View style={styles.gradientOverlay} />
              <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                <Text style={[styles.mainText]}>{image.text}</Text>
              </Animated.View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 페이지 인디케이터 */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>

      {/* 하단 버튼 영역 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={onSignupPress}>
          <Text style={styles.signupButtonText}>멤버십 가입하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>계정이 있으신가요? 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  imageContainer: {
    flex: 1,
    position: "relative"
  },
  imageSlide: {
    width: width,
    height: height * 0.75,
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative"
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "transparent"
  },
  textContainer: {
    paddingHorizontal: 40,
    alignItems: "flex-start",
    width: "100%"
  },
  mainText: {
    fontSize: 30,
    fontWeight: "300",
    color: "#FFFFFF",
    lineHeight: 40,
    letterSpacing: -0.6,
    textAlign: "left"
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  activeDot: {
    backgroundColor: "#2B2B2B"
  },
  inactiveDot: {
    backgroundColor: "#D6DADF"
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
    height: height * 0.25,
    justifyContent: "center"
  },
  signupButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 20
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  loginButton: {
    paddingVertical: 8
  },
  loginButtonText: {
    color: "#2B2B2B",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
});

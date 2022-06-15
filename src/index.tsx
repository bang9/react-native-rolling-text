import { Animated, Easing, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";

type Props = {
    force?: boolean;
    debug?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    startDelay?: number;
    delay?: number;
    durationMsPerWidth?: number;
};

const SMOOTH_OFFSET = 30;
const RollingText: React.FC<Props> = ({
    children,
    force,
    debug,
    containerStyle,
    style,
    startDelay = 2000,
    delay = 0,
    durationMsPerWidth = 25
}) => {
    const [width, setWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;

    const logger = useCallback(
        (...args) => (debug && __DEV__ ? console.log("[debug-marquee]", ...args) : () => {}),
        [debug]
    );

    useEffect(() => {
        if (width === 0 || textWidth === 0) return;

        logger("container width:", width);
        logger("text width:", textWidth);

        let marquee, timeout;

        if (force || width < textWidth) {
            logger("marquee animation triggered");

            const durationPerRange = durationMsPerWidth;
            const initialTranslateRange = textWidth;
            const translateRange = width + textWidth;
            const initialDuration = Math.round(initialTranslateRange * durationPerRange);
            const duration = Math.round(translateRange * durationPerRange);

            const sequence = Animated.sequence([
                Animated.timing(animation, {
                    useNativeDriver: true,
                    duration,
                    toValue: -textWidth - SMOOTH_OFFSET,
                    easing: Easing.linear
                }),
                Animated.timing(animation, {
                    useNativeDriver: true,
                    duration: 0,
                    delay,
                    toValue: width,
                    easing: Easing.linear
                })
            ]);

            marquee = Animated.loop(sequence, { resetBeforeIteration: true });

            logger("marquee initial animation started");
            Animated.timing(animation, {
                useNativeDriver: true,
                duration: initialDuration,
                delay: startDelay,
                toValue: -textWidth,
                easing: Easing.linear
            }).start(({ finished }) => {
                if (finished) {
                    logger("marquee initial animation finished");
                    timeout = setTimeout(() => {
                        animation.setValue(width);
                        marquee && marquee.start();
                    }, delay);
                    logger("marquee loop animation started");
                }
            });
        }

        return () => {
            animation.setValue(0);
            marquee && marquee.stop();
            timeout && clearTimeout(timeout);
        };
    }, [animation, width, textWidth]);

    return (
        <Animated.View
            onLayout={e => setWidth(e.nativeEvent.layout.width)}
            style={[
                containerStyle,
                { transform: [{ translateX: animation }], flexWrap: "wrap", width: "100%" },
                debug && { borderWidth: 1, borderColor: "red" }
            ]}
        >
            <Text
                numberOfLines={1}
                onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
                style={[style, debug && { borderWidth: 1, borderColor: "green" }]}
            >
                {children}
            </Text>
        </Animated.View>
    );
};

export default RollingText;

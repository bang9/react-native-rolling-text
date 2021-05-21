<span class="module"><a href="https://github.com/bang9/react-native-rolling-text" title="View this project"><img src="https://img.shields.io/badge/React Native-react--native--rolling--text-black?style=flat-square&logo=react" alt="RNRollingText" /></a></span>

<span class="npmversion"><a href="https://npmjs.org/package/react-native-rolling-text" title="View this project on NPM"><img src="https://img.shields.io/npm/v/react-native-rolling-text.svg" alt="NPM version" /></a></span>
<span class="npmdownloads"><a href="https://npmjs.org/package/react-native-rolling-text" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/react-native-rolling-text.svg" alt="NPM downloads" /></a></span>

# react-native-rolling-text
marquee in react-native!

![img](screenshot/result.gif)

## Installation

```sh
npm install react-native-rolling-text
```

```sh
yarn add react-native-rolling-text
```

## Usage

- It is affected by the size of the container.
- Don't for get add overflow style to container.

```jsx
import RollingText from "react-native-rolling-text";

<View style={{width:150, overflow:'hidden'}}>
    <RollingText>
        {"Enter your Loooooooooooooooooooong text"}
    </RollingText>
</View>
```

## Change Logs


## Support Props

| Prop                | Type      | Default | Description                           |
| :------------------ | :-------- | :------ | ------------------------------------- |
| debug?              | boolean   | false   | debugging mode                        |
| force?              | boolean   | false   | Makes the animation work even if the text is not longer than the container |
| containerStyle?     | ViewStyle | -       | component container style             |
| style?              | TextStyle | -       | text style                            | 
| startDelay?         | number    | 2000    | animation delay at trigger time       |
| delay?              | number    | 0       | animation delay at end                |
| durationMsPerWidth? | number    | 25      | speed of animation, lower is faster   |

## Example

```jsx
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RollingText from 'react-native-rolling-text';

export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.title}>{'MARQUEE BANNER'}</Text>
                <RollingText durationMsPerWidth={15} style={{ fontSize: 12 }}>
                    {
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum elementum ante.'
                    }
                </RollingText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        height: 60,
        width: '80%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default App;
```

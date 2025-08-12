# Card Animation (React Native + Expo)

This project demonstrates a tappable memory card with smooth expand/collapse animation.

## Video
https://github.com/user-attachments/assets/e604611c-9a36-4151-981c-7d2b1fdec5b2


## Setup and Run Instructions

1. Clone this repo
```bash
git clone https://github.com/JalpeshDev/RN_Animation_Task.git 
cd RN_Animation_Task
```
2. Install node modules 

```bash
npm install
```
3. Prebuild the project for native platforms 
```bash
npm run prebuild
```
4. Run on your desired platform
 ```bash
 npm run android
 # or
 npm run ios
```

## Animation Libraries Used
- [Moti](https://moti.fyi/)
- [React Native Reanimated (Moti depends on reanimated)](https://docs.swmansion.com/react-native-reanimated/)

#### Why Moti?
Moti provides a simple, declarative API for complex React Native animations, making it easy to create smooth transitions and shared element effects. It builds on top of Reanimated, allowing for performant, interruptible, and highly customizable animations with less boilerplate code.


## Improvements for a Real App
- Enhanced accessibility (screen reader labels, reduced motion support)
- Gesture support for expand/collapse (e.g., swipe or drag)
- State separation for scalable lists or global state
- Shared-element transitions for detail views
- Lazy-load high-res images after expansion
- Add unit tests for reliability

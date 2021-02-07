import React, { Ref, useImperativeHandle, useRef } from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import Canvas, { CanvasProps } from 'react-native-canvas';

interface SignatureProps {
  containerStyle?: StyleProp<ViewStyle>;
  canvasStyle?: StyleProp<ViewStyle>;
  lineWidth?: number;
  lineColor?: string;
  onChange?: (signature: string) => void;
  onBegin: () => void;
  onEnd: () => void;
}

const Signature = (
  {
    containerStyle,
    canvasStyle,
    lineWidth = 3,
    lineColor = 'black',
    onChange,
    onBegin,
    onEnd,
  }: SignatureProps,
  ref: Ref<any>,
) => {
  const canvasRef = useRef<any>();
  let lastX: number | null = 0;
  let lastY: number | null = 0;

  useImperativeHandle(ref, () => ({
    readSignature,
    clearSignature,
  }));

  const readSignature = async (): Promise<void> => {
    lastX = null;
    lastY = null;
    onEnd?.();

    const signature = JSON.parse(
      (await canvasRef?.current?.toDataURL?.()) || '',
    );

    onChange?.(signature);
  };

  const clearSignature = async (): Promise<void> => {
    if (canvasRef?.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.beginPath();
      await readSignature();
    }
  };

  const trackSignature = (e: GestureResponderEvent): void => {
    if (canvasRef?.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.globalCompositionOperation = 'source-over';

      const { locationX, locationY } = e.nativeEvent;

      if (lastX !== null && lastY !== null) {
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(locationX, locationY);
      } else {
        ctx.fillRect(locationX, locationY, 1, 1);
      }

      lastX = locationX;
      lastY = locationY;
      ctx.stroke();
    }
  };

  return (
    <>
      <View
        style={containerStyle}
        onTouchCancel={readSignature}
        onTouchStart={() => {
          lastX = null;
          lastY = null;
          onBegin?.();
        }}
        onTouchEnd={readSignature}
        onTouchMove={trackSignature}>
        <Canvas ref={canvasRef} style={canvasStyle} />
      </View>
    </>
  );
};

export default React.forwardRef(Signature);

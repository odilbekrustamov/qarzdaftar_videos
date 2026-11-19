import React from 'react';
import { Composition, Folder } from 'remotion';
import { VIDEO_DIMENSIONS } from './theme/brand';
import {
  getLesson01DurationInFrames,
  Lesson01Intro,
  lesson01Schema,
} from './lessons/lesson-01-intro';

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  const uzFrames = getLesson01DurationInFrames('uz');
  const ruFrames = getLesson01DurationInFrames('ru');

  return (
    <Folder name="Lesson-01-Intro">
      <Composition
        id="Lesson01-UZ-Vertical"
        component={Lesson01Intro}
        durationInFrames={uzFrames}
        fps={FPS}
        width={VIDEO_DIMENSIONS.vertical.width}
        height={VIDEO_DIMENSIONS.vertical.height}
        schema={lesson01Schema}
        defaultProps={{
          locale: 'uz',
          aspectRatio: 'vertical',
        }}
      />
      <Composition
        id="Lesson01-UZ-Landscape"
        component={Lesson01Intro}
        durationInFrames={uzFrames}
        fps={FPS}
        width={VIDEO_DIMENSIONS.landscape.width}
        height={VIDEO_DIMENSIONS.landscape.height}
        schema={lesson01Schema}
        defaultProps={{
          locale: 'uz',
          aspectRatio: 'landscape',
        }}
      />
      <Composition
        id="Lesson01-RU-Vertical"
        component={Lesson01Intro}
        durationInFrames={ruFrames}
        fps={FPS}
        width={VIDEO_DIMENSIONS.vertical.width}
        height={VIDEO_DIMENSIONS.vertical.height}
        schema={lesson01Schema}
        defaultProps={{
          locale: 'ru',
          aspectRatio: 'vertical',
        }}
      />
      <Composition
        id="Lesson01-RU-Landscape"
        component={Lesson01Intro}
        durationInFrames={ruFrames}
        fps={FPS}
        width={VIDEO_DIMENSIONS.landscape.width}
        height={VIDEO_DIMENSIONS.landscape.height}
        schema={lesson01Schema}
        defaultProps={{
          locale: 'ru',
          aspectRatio: 'landscape',
        }}
      />
    </Folder>
  );
};

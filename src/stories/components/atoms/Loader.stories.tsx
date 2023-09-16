import React from 'react';
import Loader from '@components/atoms/loader/Loader';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { LoaderInitialState } from '@redux/LoaderReducer.ts';
import { StoryFn } from '@storybook/react';

export const MockedState = {
  loading: true,
};

// A super-simple mock of a redux store
const Mockstore = ({ loaderState, children }: { loaderState: LoaderInitialState; children: React.ReactNode }) => (
  <Provider
    store={configureStore({
      reducer: {
        loader: createSlice({
          name: 'loader',
          initialState: loaderState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: Loader,
  title: 'Example/Loader',
  decorators: [(Story: StoryFn) => <Story />],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
};

export const Default = {
  decorators: [
    (Story: StoryFn) => (
      <Mockstore loaderState={MockedState}>
        <Story />
      </Mockstore>
    ),
  ],
};
export const VisibleOverlay = {
  decorators: [
    (Story: StoryFn) => (
      <Mockstore loaderState={MockedState}>
        <div className="bg-black w-screen h-screen">
          <Story />
        </div>
      </Mockstore>
    ),
  ],
};

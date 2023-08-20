// src/components/Home.tsx
const Home = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <p>Home</p>;
};
// src/components/Settings.tsx
const Settings = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <p>Settings</p>;
};
// src/components/Topics.tsx
const Topics = () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <p>Topics</p>;
};

import { Routes, Route } from 'react-router-dom';

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};
export default Main;

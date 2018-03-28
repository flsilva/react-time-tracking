let navigator;

export default (_navigator) => {
  navigator = _navigator;
};

export const getNavBack = () => navigator.goBack;

export const getNavTo = () => navigator.push;

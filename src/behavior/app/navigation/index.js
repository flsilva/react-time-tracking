let navigator;

export default (_navigator) => {
  navigator = _navigator;
};

export const getNavigator = () => navigator;

// eslint-disable-next-line import/prefer-default-export
export const GetTaskColor = (status: string) => {
  switch (status) {
    case 'Done':
      return '#00ff00';
    case 'In-Process':
      return '#FFC107';
    case 'Started':
      return '#3a21f3';
    default:
      return '#ff2c07';
  }
};

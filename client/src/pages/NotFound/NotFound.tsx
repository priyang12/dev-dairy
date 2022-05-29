type PropData = {
  heading: string;
  subheading: string;
};
interface INotFoundProps {
  data?: PropData;
}
function NotFound({ data }: INotFoundProps) {
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" />
        {data?.heading}
      </h1>
      <p className="large">{data?.subheading}</p>
    </>
  );
}

NotFound.defaultProps = {
  data: {
    heading: 'Page Not Found',
    subheading: 'Sorry, this page does not exist',
  },
};

export default NotFound;

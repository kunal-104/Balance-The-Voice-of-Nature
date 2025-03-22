const NewsPage = () => {
  return (
    <div className="w-screen h-screen absolute left-0 top-8">
      <iframe
        src="https://earth.org/"
        className="w-full h-full border-none"
        title="News"
      />
    </div>
  );
};

export default NewsPage;

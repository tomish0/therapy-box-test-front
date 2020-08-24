import React from "react";

function NewsLink(props) {
  return (
    <div className="news-link-container">
      <h3>Headline</h3>
      <p>{props.currentNews.newsTitle}</p>
    </div>
  );
}

export default NewsLink;

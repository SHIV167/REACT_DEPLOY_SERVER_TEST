import React, { useState, useEffect } from "react";

const WordPressPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts with embedded media
        const response = await fetch(
          "https://shivjha.online/wp-json/wp/v2/posts?_embed"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get the featured image URL from the post's _embedded data
  const getFeaturedImageUrl = (post) => {
    // Check if post has embedded media and featured image
    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0] &&
      post._embedded["wp:featuredmedia"][0].source_url
    ) {
      return post._embedded["wp:featuredmedia"][0].source_url;
    }

    // Return a placeholder if no image is found
    return "/api/placeholder/400/225";
  };

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wordpress-posts">
      <h2>Latest Posts</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-image">
              {post._embedded && post._embedded["wp:featuredmedia"] && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={
                    post._embedded["wp:featuredmedia"][0].alt_text ||
                    post.title.rendered
                  }
                />
              )}
            </div>
            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <a href={post.link}>Read More</a>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordPressPosts;

const blog = require("../models/blog");

const dummy = (blogs) => {
    blogs = 1;
    return blogs;
  }

const totalLikes = (blogs) => {
    let totalAmount = 0;
    for(let i = 0; i<blogs.length; i++){
        console.log("totalamount: " + totalAmount)
        console.log("blog likes: " + blogs[i].likes)
        totalAmount += blogs[i].likes
    }
    console.log(totalAmount)
    return totalAmount;
}
const favoriteBlog = (blogs) => {
    let mostLikes = 0;
    let mostLiked = 0;
    for(let i = 0; i<blogs.length; i++){
        /* console.log("likes: " + blogs[i].likes + " pyöräytyksellä: " + i) */
        if(blogs[i].likes > mostLikes){
            /* console.log("most liked on: " + mostLiked + " pyöräytyksellä: " + i)
            console.log("most likes on: " + mostLikes + " pyöräytyksellä: " + i) */
            mostLikes = blogs[i].likes
            mostLiked = i
        }
        /* console.log("most likes lopuksi: " + mostLikes)
        console.log("blogi: " + JSON.stringify(blogs[mostLiked])) */
    }
    const mostLikedBlog = JSON.stringify(blogs[mostLiked])
    return mostLikedBlog;

}
const mostLikes = (blogs) =>{
  var bloggers = []
  var bloggers2 = []
  
  for(let i = 0; i<blogs.length; i++){
    bloggers.push(blogs[i].author)
}

  for(let i = 0; i<blogs.length;i++){
    bloggers2.push({author: blogs[i].author,likes:blogs[i].likes})
  }

  const maxValueOfY = Math.max(...bloggers2.map(o => o.likes), 0);
    console.log(maxValueOfY)
}


const mostBlogs = (blogs) => {
    var bloggers = []
    for(let i = 0; i<blogs.length; i++){
        bloggers.push(blogs[i].author)
    }
   
      let item = bloggers[0];
      let ocurrencesMap = {};
    
      for (let i in bloggers) {
        const current = bloggers[i];
    
        if (ocurrencesMap[current]) ocurrencesMap[current]++;
        else ocurrencesMap[current] = 1;
    
        if (ocurrencesMap[item] < ocurrencesMap[current]) item = current;
      }
    
      return { 
        author: item, 
        blogs: ocurrencesMap[item]
      };

      
    }

  /* const average = array => {
    const reducer = (sum, item) => {
      return sum + item
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0) / array.length
  } */
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

  const capitalize=(s)=>{
    return s[0].toUpperCase() + s.slice(1);
}

const updateNews = async ()=>{
    props.setProgress(10);
    let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=789d6c687a72469387019cb1833a9959&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(30);
    let data = await fetch(URL);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);

  }

  useEffect(() => {
    document.title = (`ExpressNews - ${capitalize(props.category)}`)
    updateNews();
    // eslint-disable-next-line 
  }, [])
  

  // const handlePrevClick=async()=>{
  //   await setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick=async()=>{
  // await setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData =async () => {
    let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=789d6c687a72469387019cb1833a9959&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    // setLoading(true)
    let data = await fetch(URL);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    
  };

  
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{marginTop: '70px'}}>Top {capitalize(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        > 
         <div className="container">
        <div className="row" >
        {articles.map((element,index)=>{
          return <div className="col-md-4" key={index}>
          <Newsitem  title={element.title?element.title.slice(0,20):""} description={element.description?element.description.slice(0,68):""} imgurl={element.urlToImage} 
          newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        

        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
        <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 12,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string,
}

export default News

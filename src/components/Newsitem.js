import React from 'react'

const Newsitem =(props)=>{

   
        let { title, description, imgurl, newsUrl, author, date, source } = props
        const d = new Date(date);
        
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imgurl ? "https://guwahatiplus.com/public/web/images/default-news.png" : imgurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <div className='my-2'><span className="badge rounded-pill text-bg-success">{source}</span></div>

                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {d.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</small></p>
                        <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    
}

export default Newsitem

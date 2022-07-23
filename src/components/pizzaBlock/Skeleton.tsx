import React from "react"
import ContentLoader from "react-content-loader"


export const Skeleton = () => (
  <ContentLoader
      className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="55" y="243" rx="0" ry="0" width="0" height="1" />
    <rect x="69" y="235" rx="0" ry="0" width="0" height="1" />
    <circle cx="139" cy="108" r="106" />
    <rect x="0" y="226" rx="15" ry="15" width="280" height="33" />
    <rect x="0" y="273" rx="0" ry="0" width="280" height="80" />
    <rect x="0" y="369" rx="15" ry="15" width="95" height="30" />
    <rect x="118" y="369" rx="15" ry="15" width="154" height="37" />
    <rect x="239" y="398" rx="0" ry="0" width="4" height="3" />
  </ContentLoader>
)

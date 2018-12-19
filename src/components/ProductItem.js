import React from 'react' 
import { Card } from 'antd';
import { Link } from 'gatsby'

const { Meta } = Card;

class ProductItem extends React.Component {
  render() {
    const { data } = this.props
    return (
    <Link to={data.fields.slug}>
      <Card
        hoverable
        title={data.frontmatter.title}
        extra={data.frontmatter.discount>0 && `${data.frontmatter.discount}% OFF`}
        cover={data.frontmatter.image && <img src={data.frontmatter.image.childImageSharp.resize.src} />}
      >
        <Meta
          description={`Rp. ${data.frontmatter.price - ((data.frontmatter.price*data.frontmatter.discount)/100)}`}
        />
      </Card></Link >
    )
  }
}

export default ProductItem

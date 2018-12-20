import React from 'react' 
import { Card, Badge, Icon } from 'antd';
import { Link } from 'gatsby'

const { Meta } = Card;

class ProductItem extends React.Component {
  render() {
    const { data } = this.props
    return (
    <Link to={data.fields.slug}>
      <Card
        hoverable
        cover={data.frontmatter.image && <img src={data.frontmatter.image.childImageSharp.resize.src} />}
        >
          <p>{data.frontmatter.title}</p>
          <p>{data.frontmatter.discount > 0 && <del>Rp. {`${data.frontmatter.price}`}</del>}</p>
          <p>{`Rp. ${data.frontmatter.price - ((data.frontmatter.price * data.frontmatter.discount) / 100)}`}</p>
      </Card></Link >
    )
  }
}

export default ProductItem

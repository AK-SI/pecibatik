import React from 'react' 
import { Card } from 'antd'
import CurrencyFormat from 'react-currency-format';
import { Link } from 'gatsby'

class ProductItem extends React.Component {
  render() {
    const { data } = this.props
    console.log(data.frontmatter.images[0].img.childImageSharp.resize.src);
    
    return (
    <Link to={data.fields.slug}>
      <Card
        hoverable
        cover={data.frontmatter.images && <img src={data.frontmatter.images[0].img.childImageSharp.resize.src} />}
        >
          <p style={{textTransform:'capitalize'}}>{data.frontmatter.title}</p>
          <p>{data.frontmatter.discount > 0 && <del>Rp. {`${data.frontmatter.price}`}</del>}</p>
          <CurrencyFormat value={data.frontmatter.price - ((data.frontmatter.price * data.frontmatter.discount) / 100)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <p>{value.replace(',','.')}</p>}  />
      </Card></Link >
    )
  }
}

export default ProductItem

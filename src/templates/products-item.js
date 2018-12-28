import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import CurrencyFormat from 'react-currency-format';

import Layout from '../components/Layout'
import { Icon,Button,Carousel,Divider,Card,Col, Row } from 'antd';

class ProductPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    
    const Harga = props => {
      if (post.frontmatter.discount>0){
        return <p style={{color:'#000'}}>Harga : <del>{`Rp. ${post.frontmatter.price}`}</del> {post.frontmatter.discount && `Rp. ${post.frontmatter.price - ((post.frontmatter.price * post.frontmatter.discount) / 100)}`}</p>        
      }else{
        return <CurrencyFormat value={post.frontmatter.price - ((post.frontmatter.price * post.frontmatter.discount) / 100)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <p style={{ color: '#000' }}>Harga : {value.replace(',', '.')}</p>} />
      }
    }
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <Row  style={{marginTop:'30px'}} type="flex" justify="center">
          <Col xs={24} sm={8} lg={6}>
            <Carousel autoplay effect="fade">
              {
                post.frontmatter.images.map(({ img }) => {
                  return <div><div style={{ width: '100%', minHeight: '350px', background:`#001529 url(${img.childImageSharp.fluid.src}) no-repeat center center fixed`, backgroundSize: "contain" }} key={img.id}></div></div>
                })
              }
            </Carousel>
            </Col>
          <Col xs={24} sm={16} lg={18} >
            <Card bordered={false}>
              <h1 style={{textTransform:'capitalize'}}>{post.frontmatter.title}</h1>
              <p style={{ color: '#000' }}>
                <b>Kode Produk : {post.frontmatter.code}</b>
              </p>
              <Harga/>
              <p style={{ color: '#000' }}>
                Barang Tersedia : {post.frontmatter.stock}
              </p>
            </Card>
          </Col>
            
        </Row><Divider>Deskripsi</Divider>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <Divider/>
        <Button.Group style={{width:'100%'}}>
          {
            previous &&
            <Link style={{float:'left'}} to={previous.fields.slug} rel="prev">
              <Button>
                <Icon type="left" /> {previous.frontmatter.title}
            </Button>
              </Link>
          }
          {
            next &&
            <Link style={{float:'right'}} to={next.fields.slug} rel="next">
              <Button>
                {next.frontmatter.title} <Icon type="right" />
              </Button>
              </Link>
          }
          
        </Button.Group>
      </Layout>
    )
  }
}

export default ProductPostTemplate

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        code
        price
        stock
        discount
        tags
        images{
          img{
            id
            childImageSharp {
              fluid(maxWidth: 600) {
                src
              }
            }
          }
        }
      }
    }
  }
`

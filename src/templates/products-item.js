import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import { Divider,Card,Col, Row } from 'antd';

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
        return <p style={{ color: '#000' }}>Harga : {`Rp. ${post.frontmatter.price}`}</p>
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
            <Card bordered={false}
              cover={post.frontmatter.image && <img src={post.frontmatter.image.childImageSharp.resize.src} />}
            />
            </Col>
          <Col xs={24} sm={16} lg={18} >
            <Card bordered={false}>
              <h1>{post.frontmatter.title}</h1>
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
        <ul>
          <li>
            {
              previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            }
          </li>
        </ul>
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
        image {
          childImageSharp {
              resize(width: 400, height: 400, cropFocus: CENTER) {
                src
              }
            }
          }
      }
    }
  }
`

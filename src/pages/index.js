import React from 'react'
import {graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Col, Row } from 'antd';
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Row gutter={8}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
            return (
              <Col xxs={24} xs={12} sm={8} md={6} lg={6} xl={4} key={node.fields.slug} >
              <div style={{padding:'.4em 0'}}>
                  <ProductItem data={node} />
              </div>
              </Col>
            )
          })}

        </Row>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            pathfolder
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            code
            price
            discount
            images{
              img{
                childImageSharp {
                  resize(width: 400, height: 400, cropFocus: CENTER) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

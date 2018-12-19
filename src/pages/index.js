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
        <Row xs={8} sm={16} md={24} lg={32}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
            return (
              <Col style={{margin:'10px'}} xs={22} sm={10} md={8} lg={6} xl={5}>
                <ProductItem data={node} key={node.fields.slug} />
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
            image {
              childImageSharp {
                resize(width: 250, height: 300, cropFocus: CENTER) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`

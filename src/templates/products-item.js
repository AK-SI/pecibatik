import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import { Col, Row } from 'antd';

class ProductPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <Row type="flex" justify="center">
          <Col xs={24} sm={8} lg={6} >col-12</Col>
          <Col xs={24} sm={16} lg={18} >
            <h1>{post.frontmatter.title}</h1>
            <p>
              {post.frontmatter.date}
            </p>
            <p>
              {post.frontmatter.code}
            </p>
            <p>
              {post.frontmatter.price}
            </p>
            <p>
              {post.frontmatter.stock}
            </p>
            <p>
              {post.frontmatter.discount} %
          </p>
          </Col>
        </Row>
        <h1>{post.frontmatter.title}</h1>
        <p>
          {post.frontmatter.date}
        </p>
        <p>
          {post.frontmatter.code}
        </p>
        <p>
          {post.frontmatter.price}
        </p>
        <p>
          {post.frontmatter.stock}
        </p>
        <p>
          {post.frontmatter.discount} %
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
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
      }
    }
  }
`

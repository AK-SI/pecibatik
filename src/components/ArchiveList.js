import React from 'react'

class ProductItem extends React.Component {
  render() {
    const { data } = this.props
    return (
      {data.map(({ node }) => {

          if (node.fields.pathfolder === "products") {
            return (
            <div key={node.fields.slug}>
              <ProductItem data={node} />
            </div>
            )
          } else { 
              const title = node.frontmatter.title || node.fields.slug
              return (
              <div key={node.fields.slug}>
                <h3>
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            )
          }
        })
      }
    )
  }
}

export default ProductItem

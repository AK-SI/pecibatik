import React from 'react'
import PropTypes from 'prop-types'
import { ProductPostTemplate } from '../../templates/products-item'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <ProductPostTemplate
    content={widgetFor('body')}
    image={entry.getIn(['data', 'image'])}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    code={entry.getIn(['data', 'code'])}
    price={entry.getIn(['data', 'price'])}
    stock={entry.getIn(['data', 'stock'])}
    discount={entry.getIn(['data', 'discount'])}
  />
)

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview

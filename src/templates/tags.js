import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"

// Utilities
const _ = require('lodash')
// Components
import Layout from '../components/Layout'

class TagsIndex extends React.Component {
    render() {
        const { group, index, first, last, pageCount, additionalContext } = this.props.pageContext;
        const { category } = additionalContext
        const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
        const nextUrl = (index + 1).toString();

        const NavLink = props => {
            if (!props.test) {
            return <Link to={props.url}>{props.text}</Link>;
            } else {
            return <span>{props.text}</span>;
            }
        }
        return(
            <Layout location={this.props.location} title="All tags">
            <Helmet>
              <title>All Tags</title>
              <meta name="description" content="All Tags" />
            </Helmet>
            <h4>All Tags</h4>
            <ol>
            {group.map( tag => (
            <li key={tag}>
             <Link to={`${category}/tags/${_.kebabCase(tag)}/`}>
                  {tag}
             </Link>
            </li>
            ))}
            </ol>
            <ul className="navlink" >
            <li className="previousLink">
              <NavLink test={first} url={`/${_.kebabCase(category)}/tags/${previousUrl}`} text="Newer" />
            </li>
            <li className="nextLink">
              <NavLink test={last} url={`/${_.kebabCase(category)}/tags/${nextUrl}`} text="Older" />
            </li>
            </ul>
            </Layout>
        )
    }
}
export default TagsIndex

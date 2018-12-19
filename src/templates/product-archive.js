import React from "react"
import Helmet from 'react-helmet'
const _ = require('lodash')
// Components
import { Link } from "gatsby"
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'

class ProductArchive extends React.Component {
    render() {
        let headerText
        const { group, index, first, last, pageCount, additionalContext } = this.props.pageContext;
        const { allTags, pathfolder, tag, totalCount,} = additionalContext
        const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
        const nextUrl = (index + 1).toString();

        const NavLink = props => {
            if (!props.test) {
            return <Link to={props.url}>{props.text}</Link>;
            } else {
            return <span>{props.text}</span>;
            }
        }

        if (tag){
            headerText = `${totalCount} post${
                totalCount === 1 ? "" : "s"
            } ${pathfolder === 'blog' ? `tagged with ${tag}` : `in ${tag} ${pathfolder}`}`
        }
        else {
            headerText = `All ${pathfolder} posts`
        }

        const HeadingText = props => {
            if (tag){
                    return <h4>{headerText} -- <Link to={`/${_.kebabCase(pathfolder)}`}>Show all {_.kebabCase(pathfolder)} posts</Link></h4>;
                }
                else{
                    return  <h4>
                        <NavLink test={first} url={`/${_.kebabCase(pathfolder)}/${previousUrl}`} text=" < " />
                        Page {index}/{pageCount}
                        <NavLink test={last} url={`/${_.kebabCase(pathfolder)}/${nextUrl}`} text=" > " />
                    </h4>;
                }
        }

      return (
        <Layout location={this.props.location} title={headerText}>
            <Helmet>
            <title>{`${headerText} | Page ${index}/${pageCount}`}</title>
            <meta name="description" content={headerText} />
            </Helmet>
            <HeadingText/>
            <div className={`list-${tag ? tag : pathfolder}`}>
            {group.map(({ node }) => {

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
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            )
          }
              
            })}
            </div>
            <ul className="navlink" >
            <li className="previousLink">
              <NavLink test={first} url={`/${_.kebabCase(pathfolder)}${tag ? `/tags/${_.kebabCase(tag)}/` : '/'}${previousUrl}`} text="Newer" />
            </li>
            <li className="nextLink">
              <NavLink test={last} url={`/${_.kebabCase(pathfolder)}${tag ? `/tags/${_.kebabCase(tag)}/` : '/'}${nextUrl}`} text="Older" />
            </li>
            </ul>
        </Layout>
      )
    }
}
export default ProductArchive
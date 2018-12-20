const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const createPaginatedPages = require("gatsby-paginate");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const templates = {
      products: path.resolve('./src/templates/products-item.js'),
      page: path.resolve('./src/templates/page-template.js'),
      tag: path.resolve('./src/templates/tags.js'),
      archive: path.resolve("src/templates/product-archive.js")
    };
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  excerpt
                  fields {
                    slug
                    pathfolder
                  }
                  frontmatter {
                    tags
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const pages = result.data.allMarkdownRemark.edges;
        const pathfolders = {};


        //populate tags and post by pathfolder
        _.each(pages, edge => {
          const { tags } = edge.node.frontmatter;
          const { pathfolder } = edge.node.fields;

          // populate post by pathfolder
          if (!pathfolders[pathfolder]) {
            pathfolders[pathfolder] = {
              posts: [],
              tags: []
            };
          }
          const thisPath = pathfolders[pathfolder];
          thisPath.posts.push(edge);

          // populate posts by tag and tags by pathfolder
          if (tags) {
            tags.forEach((tag) => {
              if (tag && tag !== '') {
                if (!thisPath.tags[tag]) {
                  thisPath.tags[tag] = [];
                }
                thisPath.tags[tag].push(edge);
              }
            });
          }
        });

        Object.keys(pathfolders).forEach((pathfolder) => {
          let allTags = [];
          const posts = pathfolders[pathfolder].posts

          if (pathfolder !== 'null') {
            //create all tags archive
            Object.keys(pathfolders[pathfolder].tags).forEach((tag) => {
              allTags.push(tag);
              const totalCount = pathfolders[pathfolder].tags[tag].length
              createPaginatedPages({
                edges: pathfolders[pathfolder].tags[tag],
                createPage: createPage,
                pageTemplate: templates.archive,
                pageLength: 10, // This is optional and defaults to 10 if not used
                pathPrefix: `/${_.kebabCase(pathfolder)}/tags/${_.kebabCase(tag)}`, // This is optional and defaults to an empty string if not used
                context: {
                  allTags,
                  pathfolder,
                  tag,
                  totalCount,
                },
              });
            })

            //paginate tag label
            allTags = _.uniq(allTags).sort();
            createPaginatedPages({
              edges: allTags,
              createPage: createPage,
              pageTemplate: templates.tag,
              pageLength: 10,
              pathPrefix: `/${_.kebabCase(pathfolder)}/tags`, // This is optional and defaults to an empty string if not used
              context: { pathfolder },
            })

            //Create paginate pathfolder archive
            createPaginatedPages({
              edges: posts,
              createPage: createPage,
              pageTemplate: templates.archive,
              pageLength: 10, // This is optional and defaults to 10 if not used
              pathPrefix: `/${_.kebabCase(pathfolder)}`, // This is optional and defaults to an empty string if not used
              context: {
                allTags,
                pathfolder,
              },
            })

            // create all post pages in category
            _.each(posts, (post, index) => {
              const previous = index === posts.length - 1 ? null : posts[index + 1].node;
              const next = index === 0 ? null : posts[index - 1].node;

              createPage({
                path: post.node.fields.slug,
                component: templates[pathfolder],
                context: {
                  slug: post.node.fields.slug,
                  pathfolder,
                  previous,
                  next,
                },
              });
            })

          } else {
            _.each(posts, (post, index) => {
              createPage({
                path: post.node.fields.slug,
                component: templates.page,
                context: {
                    slug: post.node.fields.slug,
                  },
                })
              })
            }
          })

        })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    const pathArr = value.split('/').filter(n => n)
    const [pathfolder, ...etc] = pathArr
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    if (pathArr.length > 1) {
      createNodeField({
        name: `pathfolder`,
        node,
        value: pathfolder,
      })
    }
  }
}

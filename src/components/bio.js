import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
const data = useStaticQuery<GatsbyTypes.BioQuery>(graphql`
    query BioQuery {
    site {
        siteMetadata {
        author {
            name
            summary
        }
        social {
            twitter
        }
        }
    }
    }
`)

// Set these values by editing "siteMetadata" in gatsby-config.js
const author = data.site.siteMetadata?.author
const social = data.site.siteMetadata?.social

return (
    <div className="bio">
    {author?.name && (
        <p>
        <a href={`https://twitter.com/${social?.twitter || ``}`}>
        <strong>{author.name}</strong> 
        </a>
        のブログです。 {author?.summary || null}
        {` `}
        </p>
    )}
    </div>
)
}

export default Bio
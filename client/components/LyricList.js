import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';


class LyricList extends PureComponent {
    onLike(id) {
        this.props.mutate({
            variables: { id }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ content, id, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i
                            className="material-icons"
                            onClick={() => this.onLike(id)}
                        >
                            thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID){
	likeLyric(id: $id) {
        id
        likes
    }
}
`

export default graphql(mutation)(LyricList)
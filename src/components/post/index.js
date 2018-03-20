import React, { Component } from 'react';
import { fetchModels } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import Tag from '../tag';

export default class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }
    componentDidMount() {
        fetchModels('posts', this.props.match.params.id)
            .then(res => {
                this.setState({ post: res.toPlainObject().items[0] })
            });
    }

    render() {
        if (!this.state.post) return <h2>Loading ..</h2>

        const { fields } = this.state.post;
        return <div>
            <h3>{fields.title}</h3>
            <h4 className='text-muted'>{ moment(fields.created).format("DD.MM.YYYY") }</h4>
            <div>
                { fields.tags.map(tag => {
                    return <Tag key={tag.sys.id}>{ tag.fields.title }</Tag>
                })
                }
            </div>
            <ReactMarkdown className='markdown-content' source={fields.markdown} />
        </div>
    }
}
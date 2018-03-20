import React, { Component } from 'react';
import { fetchModels } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { Badge } from 'reactstrap';

import { Card, CardText, CardTitle } from 'reactstrap';

export default class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetchModels('post')
            .then(res => {
                this.setState({ posts: res.toPlainObject().items })
            });
    }

    render() {
        if (!this.state.posts) return <h2>Loading ..</h2>
        const goToPost = (id) => window.location.href = `/posts/${id}`; 
        return <div className='d-flex flex-wrap'>
                { this.state.posts.map(({ fields, sys }) => {
                    return <div onClick={ () => goToPost(sys.id) } key={fields.title} className='posts-card p-2 my-3'>
                            <Card inverse>
                                <CardTitle className='d-block'>{ fields.title }</CardTitle>
                                <div className='mb-2'>
                                    {
                                        fields.tags.map(tag => {
                                            return <Badge key={tag.sys.id} color='info'>{tag.fields.title}</Badge>
                                        })
                                    }
                                </div>
                                <div className='posts-markdown'>
                                    <ReactMarkdown source={fields.markdown} />
                                </div>
                                {
                                    fields.authors 
                                    ? fields.authors.map(author => {
                                        return <img key={author.sys.id} style={{ position: 'absolute', top: 0, right: 0, width: 50, height: 50 }} alt='foo' src={`${author.fields.image.fields.file.url}?w=300&r=150&fit=crop&f=face&fm=png`} />
                                    })
                                    : null
                                }
                                <CardText>
                                    <small style={{ position: 'absolute', bottom: 0}} className="text-info">{ moment.duration(new Date(fields.created) - new Date()).humanize(true) }</small>
                                </CardText>
                            </Card>
                        </div>
                    }) 
                }
            </div>
    }
}
import React, {Component} from 'react';
import Post from "./Post";
import {RenderDom} from "../../../render";

// import 'bootstrap/dist/css/bootstrap.css';


class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {mposts: []};
        this.LoadAll();
        this.onRemovePost = this.onRemovePost.bind(this);
        this.onEditPost = this.onEditPost.bind(this);

    }

    async LoadAll() {
        var request = await fetch(this.props.apiUrl, {
            method: "GET",
            mode: "cors",
            credintials: "include"
        });
        if (request.ok) {
            var res = await request.json();
            this.setState({"mposts": res});
        }
    }

    async onRemovePost(mpost) {
        if (mpost) {
            var request = await fetch("/api/posts/" + mpost.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
            this.LoadAll();
            RenderDom();
        }
    }

    async onEditPost(mpost) {
        if(mpost){
            window.location.assign("/postedit/"+mpost.id);
        }
    }

    render() {
        var remove = this.onRemovePost;
        var edit = this.onEditPost;
        return (
            <div>
                {this.state.mposts.map(function (mpost) {
                    return <Post key={mpost.id} mpost={mpost} onRemove={remove} onEdit={edit}/>
                })}
            </div>
        )
    }
}

export default NewsList;
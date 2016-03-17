const PostCommenters = ({commenters}) => {
  return (
    <div className="post-commenters">
      <h4>Comments by</h4>
      <ul>
        {commenters.map(commenter => <li key={commenter._id}>{Users.getDisplayName(commenter)}</li>)}
      </ul>
    </div>
  )
}

module.exports = PostCommenters;
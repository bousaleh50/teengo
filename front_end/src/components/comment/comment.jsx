function Comment() {
    return (
        <>
           <div className="p-3 border rounded gap-3">
                <div className="flex gap-3 items-center">
                    <img src={post.img} alt="" className="w-5 h-5 rounded-full object-cover"/>
                    <span>{post.name}</span>
                    <span className="text-gray-400">1 minuts ago</span>
                </div>
                <div className="flex gap-4 p-4">
                    <span>Lorem ipsum dolor sit amet consero, quos incidunt magni eos inventore enim vitam</span>
                    <span>like</span>
                    <span>dislike</span>
                </div>
                
            </div>
        </>
    );
}

export default Comment;
import _ from "lodash";
import { CommentDto } from "services/CommentService/dtos";
import CommentItem from "../CommentItem";

interface CommentListProps {
  feedId?: number;
  comments?: CommentDto[];
  loading: boolean;
  error?: any;
  child?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading, error, feedId, child = false }) => {
  return (
    <div>
      {_.map(comments, (item: CommentDto) => {
        return <CommentItem
          key={item.id}
          child={child}
          comment={item} />;
      })}
    </div>
  );
};

export default CommentList;

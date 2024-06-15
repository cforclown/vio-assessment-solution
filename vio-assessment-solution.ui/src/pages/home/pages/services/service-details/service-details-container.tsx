import H3 from '@/components/typography/h3';
import { IService, IUser } from 'vio-assessment-solution.contracts';

export interface IServiceDetailsContainerProps extends IService<IUser> {}

function ServiceDetailsContainer({
  name,
  desc,
  repoUrl,
  status,
  containerId,
  url,
  createdBy,
  createdAt
}: IServiceDetailsContainerProps) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <H3>{name}</H3>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold">Repository URL</p>
        <p>{repoUrl}</p>
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold">Description</p>
        <p>{desc}</p>
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold">Created by</p>
        {createdBy && (
          <p>
            by <span className="font-bold text-blue-800">{createdBy.fullname}</span> {createdAt && <>at <span className="font-bold text-gray-700">{`${createdAt}`}</span></>}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold">Status</p>
        <p>{status}</p>
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold">Container ID</p>
        {containerId ? (
          <p>{containerId}</p>
        ) : '-'}
      </div>
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold">URL</p>
        {url ? (
          <p>{url}</p>
        ) : '-'}
      </div>
    </div>
  );
}

export default ServiceDetailsContainer;
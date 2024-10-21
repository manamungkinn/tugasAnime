import { authUserSession } from "@/libs/auth-libs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import Image from "next/image";
import DropDownProfile from "@/components/DropDownProfile";
import CollectionList from "@/components/CollectionList";
import DashboardComment from "@/components/DashboadComment";



const Page = async () => {
  const user = await authUserSession();
  let collection = await prisma.collection.findMany({
    where: {
      user_email: user?.email,
    },
  });
  collection = {data:collection}

  const comment = await prisma.comment.findMany({
    where: {
      user_email: user?.email,
    },
  });

  // console.log(collection);
  return (
    <>
      <div className="container mt-2">
        <>
          <div className="h-[57px] bg-main-primary">
            <DropDownProfile image={user.image} email={user.email} name={user.name} />
          </div>
          <div className="p-3">

          {/* {collection.data.map((data, i) => {
            return (
              <div key={i}>
                <h1 className="text-main-accent">{data.id}</h1>
              </div>
            );
          })} */}
          <div>
            <h1 className="text-main-accent font-semibold text-lg p-y px-1">My Collection</h1>
          <CollectionList api={collection} />
          </div>
          <div className="mt-5">
          <h1 className="text-main-accent font-semibold text-lg p-y px-1">My Comment</h1>
            <DashboardComment data={comment}/>
          </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Page;
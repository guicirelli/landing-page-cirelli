import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ClientOnly } from '@/components/commons/ClientOnly'; // Importar ClientOnly
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton"; // Importar CustomSignInButton

interface PostProps {
  postData: PostData;
}

const Post = ({ postData }: PostProps) => {
  if (!postData) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>;
  }

  const ImageRenderer = ({ node, ...props }: any) => {
    return (
      <div className="flex justify-center items-center mb-4">
        <img {...props} className="w-full h-auto max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem] rounded-lg shadow-lg" />
      </div>
    );
  };

  const ParagraphRenderer = ({ node, ...props }: any) => {
    return (
      <p {...props} className="mb-4 leading-relaxed text-lg" />
    );
  };

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">{postData.title}</h1>

        {postData.public ? (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
            <div className="md:w-1/2 flex flex-col items-center">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ImageRenderer,
                  p: ({ node, ...props }) => {
                    // Se o parágrafo contém apenas uma imagem, renderizar como div
                    if (node.children.length === 1 && node.children[0].type === 'image') {
                      return <ImageRenderer {...(node.children[0].props || {})} />;
                    }
                    return <ParagraphRenderer {...props} />;
                  },
                }}
              >
                {postData.content.split('\n').filter(line => line.startsWith('!')).join('\n')}
              </ReactMarkdown>
            </div>
            <div className="md:w-1/2 flex flex-col items-start">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ParagraphRenderer,
                  img: () => null, // Não renderizar imagens aqui
                }}
              >
                {postData.content.split('\n').filter(line => !line.startsWith('!')).join('\n')}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <>
            <ClientOnly>
              <SignedOut>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Access Denied!</strong>
                  <span className="block sm:inline"> This is a private post. Please log in to view it.</span>
                </div>
                <div className="mt-4 text-center">
                  <CustomSignInButton />
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                  <div className="md:w-1/2 flex flex-col items-center">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        img: ImageRenderer,
                        p: ({ node, ...props }) => {
                          // Se o parágrafo contém apenas uma imagem, renderizar como div
                          if (node.children.length === 1 && node.children[0].type === 'image') {
                            return <ImageRenderer {...(node.children[0].props || {})} />; 
                          }
                          return <ParagraphRenderer {...props} />;
                        },
                      }}
                    >
                      {postData.content.split('\n').filter(line => line.startsWith('!')).join('\n')}
                    </ReactMarkdown>
                  </div>
                  <div className="md:w-1/2 flex flex-col items-start">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ParagraphRenderer,
                        img: () => null, 
                      }}
                    >
                      {postData.content.split('\n').filter(line => !line.startsWith('!')).join('\n')}
                    </ReactMarkdown>
                  </div>
                </div>
              </SignedIn>
            </ClientOnly>
          </>
        )}

        <p className="mt-8 text-center"><a href="/" className="text-blue-500 hover:underline">Voltar para a Home</a></p>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postData = await getPostData(params?.slug as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;

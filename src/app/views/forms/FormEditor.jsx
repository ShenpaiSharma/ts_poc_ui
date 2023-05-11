import { useState } from "react";
import { Breadcrumb, SimpleCard, RichTextEditor } from "@gull";
import { content1, content2, content3 } from "./richEditorContent";

const FormEditor = () => {
  const [state, setState] = useState({
    content1,
    content2,
    content3,
  });

  const handleContentChange = (contentHtml, property) => {
    setState((prevState) => ({
      ...prevState,
      [property]: contentHtml,
    }));
  };

  return (
    <div>
      <Breadcrumb
        routeSegments={[
          { name: "Forms", path: "/forms" },
          { name: "Rich Editor" },
        ]}
      ></Breadcrumb>

      <div className="row">
        <div className="col-md-12 mb-3">
          <SimpleCard
            title="Snow Editor"
            subtitle="Your powerful rich text editor."
          >
            <RichTextEditor
              theme="snow"
              modules={{
                toolbar: [
                  [{ size: ["small", false, "large", "huge"] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["clean"],
                ],
              }}
              content={state.content1}
              handleContentChange={(html) =>
                handleContentChange(html, "content1")
              }
              placeholder="insert text here..."
            />
          </SimpleCard>
        </div>
        <div className="col-md-12 mb-3">
          <SimpleCard
            title="Bubble Editor"
            subtitle="Your powerful rich text editor."
          >
            <RichTextEditor
              theme="bubble"
              content={state.content2}
              handleContentChange={(html) =>
                handleContentChange(html, "content2")
              }
              placeholder="insert text here..."
            />
          </SimpleCard>
        </div>
        <div className="col-md-12">
          <SimpleCard
            title="Full Editor"
            subtitle="Your powerful rich text editor."
          >
            <RichTextEditor
              content={state.content3}
              handleContentChange={(html) =>
                handleContentChange(html, "content3")
              }
              placeholder="insert text here..."
            />
          </SimpleCard>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;

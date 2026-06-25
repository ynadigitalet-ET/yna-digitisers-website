"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { saveBlogPost, deleteBlogPost } from "@/app/actions/admin";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogManager({ posts }: { posts: BlogPost[] }) {
  const [items, setItems] = useState(posts);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", meta_title: "", meta_description: "", published: false });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({ title: "", content: "", excerpt: "", meta_title: "", meta_description: "", published: false });
    setEditing(null);
    setCreating(false);
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post);
    setCreating(true);
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      published: post.published,
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }
    setLoading(true);
    const result = await saveBlogPost({ id: editing?.id, ...form });
    setLoading(false);
    if (result.success) {
      toast.success(editing ? "Post updated" : "Post created");
      resetForm();
      window.location.reload();
    } else {
      toast.error(result.message || "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const result = await deleteBlogPost(id);
    if (result.success) {
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted");
    }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => setCreating(true)} className="mb-6">
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <h3 className="font-semibold">{editing ? "Edit Post" : "New Post"}</h3>
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <div>
            <label className="label">Content</label>
            <RichTextEditor value={form.content} onChange={(content) => setForm({ ...form, content })} />
          </div>
          <Input label="Meta Title" value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
          <Input label="Meta Description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <div className="flex gap-2">
            <Button onClick={handleSave} loading={loading}>Save</Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((post) => (
          <div key={post.id} className="card flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.title}</h3>
                {post.published ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted" />}
              </div>
              <p className="text-xs text-muted">{formatDate(post.created_at)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(post)} className="rounded-lg border border-border p-2 hover:bg-border"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(post.id)} className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

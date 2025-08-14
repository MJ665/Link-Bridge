'use client' // <--- ADD THIS LINE

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

// ... (the rest of the file remains the same as provided previously)
interface Link {
  id: string;
  slug: string;
  originalUrl: string;
  clickCount: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [links, setLinks] = useState<Link[]>([])
  const [newLink, setNewLink] = useState({ slug: '', originalUrl: '' })
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/')
    } else if (status === "authenticated") {
      fetchLinks()
    }
  }, [status, router])

  const fetchLinks = async () => {
    const res = await fetch('/api/links')
    if (res.ok) {
      const data = await res.json()
      setLinks(data)
    }
  }

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLink.originalUrl) {
        toast.error("Original URL is required.");
        return;
    }
    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLink),
    })

    if (res.ok) {
      toast.success("Link created successfully!")
      setNewLink({ slug: '', originalUrl: '' })
      fetchLinks()
    } else {
      const error = await res.json()
      toast.error(`Error: ${error.error}`)
    }
  }

  const handleEditLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;

    const res = await fetch(`/api/links/${editingLink.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editingLink.slug, originalUrl: editingLink.originalUrl }),
    });

    if (res.ok) {
      toast.success("Link updated successfully!");
      setIsEditDialogOpen(false);
      setEditingLink(null);
      fetchLinks();
    } else {
      const error = await res.json();
      toast.error(`Error: ${error.error}`);
    }
  };

  const handleDeleteLink = async (id: string) => {
    const res = await fetch(`/api/links/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      toast.success("Link deleted successfully!")
      fetchLinks()
    } else {
      toast.error("Failed to delete link.")
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create a new link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateLink} className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Original URL"
              value={newLink.originalUrl}
              onChange={(e) => setNewLink({ ...newLink, originalUrl: e.target.value })}
              required
              className="flex-grow"
            />
            <Input
              placeholder="Custom Slug (optional)"
              value={newLink.slug}
              onChange={(e) => setNewLink({ ...newLink, slug: e.target.value })}
            />
            <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Links</h2>
        <div className="space-y-4">
          {links.map((link) => (
            <Card key={link.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-grow">
                  <p className="font-bold text-lg">/go/{link.slug}</p>
                  <p className="text-sm text-gray-500 break-all">{link.originalUrl}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                   <p className="text-sm pr-4">Clicks: <span className="font-bold">{link.clickCount}</span></p>
                  <Dialog open={isEditDialogOpen && editingLink?.id === link.id} onOpenChange={(open) => {
                    if (open) {
                      setEditingLink(link);
                      setIsEditDialogOpen(true);
                    } else {
                      setIsEditDialogOpen(false);
                      setEditingLink(null);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Link</DialogTitle>
                         <DialogDescription>
                            Make changes to your link here. Click save when you're done.
                         </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEditLink}>
                         <Input
                           className="my-2"
                           placeholder="Original URL"
                           value={editingLink?.originalUrl || ''}
                           onChange={(e) => setEditingLink(editingLink ? { ...editingLink, originalUrl: e.target.value } : null)}
                           required
                         />
                         <Input
                           className="my-2"
                           placeholder="Slug"
                           value={editingLink?.slug || ''}
                           onChange={(e) => setEditingLink(editingLink ? { ...editingLink, slug: e.target.value } : null)}
                           required
                         />
                         <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                         </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" onClick={() => handleDeleteLink(link.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
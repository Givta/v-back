const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}))
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

// In-memory storage (for demo purposes)
let posts = [
  {
    id: uuidv4(),
    title: 'Top 10 Phones Under ₦100k That Will Blow Your Mind in 2024',
    slug: 'top-10-phones-under-100k',
    excerpt: 'Discover the best budget smartphones that offer premium features without breaking the bank.',
    content: `
      <h2>1. Samsung Galaxy A14</h2>
      <p>The Samsung Galaxy A14 offers excellent value with a large 6.6-inch display and solid battery life.</p>
      
      <h2>2. Infinix Hot 30 Play</h2>
      <p>With its massive 6000mAh battery and 6.82-inch display, this phone is perfect for heavy users.</p>
      
      <h2>3. Tecno Spark 20 Pro</h2>
      <p>Features a stunning 6.8-inch display with 90Hz refresh rate and impressive camera capabilities.</p>
      
      <h2>4. Redmi 12</h2>
      <p>Xiaomi's offering comes with a 6.79-inch display and a capable 50MP main camera.</p>
      
      <h2>5. Nokia G22</h2>
      <p>Known for its durability and clean Android experience with 3 years of updates.</p>
      
      <h2>6. Itel S23+</h2>
      <p>Surprisingly good specs for the price, including a 6.6-inch display and 5000mAh battery.</p>
      
      <h2>7. Realme C55</h2>
      <p>Stylish design with a 6.72-inch display and 5000mAh battery.</p>
      
      <h2>8. Oppo A18</h2>
      <p>Compact design with solid performance and good camera quality.</p>
      
      <h2>9. Vivo Y27</h2>
      <p>Features a 6.56-inch display and 5000mAh battery with fast charging.</p>
      
      <h2>10. Motorola Moto G Power (2024)</h2>
      <p>Excellent battery life with a clean Android experience.</p>
    `,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
    views: 1250,
    likes: 45,
    comments: 12,
    createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    author: 'Tech Expert',
    tags: ['phones', 'budget', '2024']
  },
  {
    id: uuidv4(),
    title: '5 Movies Everyone\'s Talking About Right Now',
    slug: '5-movies-everyone-talking-about',
    excerpt: 'From blockbusters to hidden gems, these are the films dominating conversations.',
    content: `
      <h2>1. Oppenheimer</h2>
      <p>Christopher Nolan's biographical thriller about J. Robert Oppenheimer has been breaking box office records and sparking intense discussions.</p>
      
      <h2>2. Barbie</h2>
      <p>Greta Gerwig's colorful and thought-provoking take on the iconic doll has become a cultural phenomenon.</p>
      
      <h2>3. Past Lives</h2>
      <p>This indie romantic drama has captured hearts with its beautiful storytelling and emotional depth.</p>
      
      <h2>4. The Super Mario Bros. Movie</h2>
      <p>The animated adaptation of the beloved video game franchise has been a massive hit with families.</p>
      
      <h2>5. Spider-Man: Across the Spider-Verse</h2>
      <p>The sequel to the Academy Award-winning film continues to impress with its stunning animation and storytelling.</p>
    `,
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1536440136628-64691ba7523e?w=800&auto=format&fit=crop&q=60',
    views: 890,
    likes: 32,
    comments: 8,
    createdAt: new Date('2024-01-14T14:30:00Z').toISOString(),
    updatedAt: new Date('2024-01-14T14:30:00Z').toISOString(),
    author: 'Movie Buff',
    tags: ['movies', 'entertainment', 'trending']
  },
  {
    id: uuidv4(),
    title: '7 Hilarious TikToks That Made Our Day',
    slug: '7-hilarious-tiktoks-made-our-day',
    excerpt: 'These viral videos are guaranteed to make you laugh out loud.',
    content: `
      <h2>1. The Dancing Grandma</h2>
      <p>This 78-year-old grandmother's dance moves have more energy than most 20-year-olds!</p>
      
      <h2>2. Cat vs. Cucumber</h2>
      <p>The eternal battle continues with this hilarious compilation of cats reacting to cucumbers.</p>
      
      <h2>3. Epic Fail Compilation</h2>
      <p>From skateboarding mishaps to cooking disasters, this compilation has it all.</p>
      
      <h2>4. Dog Reacts to Owner's Magic Trick</h2>
      <p>Watch this dog's priceless reaction when its owner makes a treat disappear.</p>
      
      <h2>5. Sibling Pranks Gone Wrong</h2>
      <p>These siblings take pranking to a whole new level with hilarious consequences.</p>
      
      <h2>6. Office Dance Challenge</h2>
      <p>Watch these coworkers turn their boring office into a dance floor.</p>
      
      <h2>7. Baby's First Words</h2>
      <p>These adorable babies say the most unexpected things that will make your day.</p>
    `,
    category: 'Viral',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60',
    views: 2100,
    likes: 89,
    comments: 25,
    createdAt: new Date('2024-01-13T09:15:00Z').toISOString(),
    updatedAt: new Date('2024-01-13T09:15:00Z').toISOString(),
    author: 'Viral Hunter',
    tags: ['tiktok', 'viral', 'funny']
  }
]

let comments = [
  {
    id: uuidv4(),
    postId: posts[0].id,
    author: 'TechFan123',
    email: 'techfan@example.com',
    content: "Great list! I recently got the Infinix Hot 30 Play and it's amazing for the price.",
    createdAt: new Date('2024-01-15T12:30:00Z').toISOString(),
    likes: 5
  },
  {
    id: uuidv4(),
    postId: posts[0].id,
    author: 'PhoneGuru',
    email: 'phoneguru@example.com',
    content: 'I think you missed the Tecno Spark 20. It has better specs than some on this list!',
    createdAt: new Date('2024-01-15T14:20:00Z').toISOString(),
    likes: 3
  },
  {
    id: uuidv4(),
    postId: posts[1].id,
    author: 'MovieLover',
    email: 'movielover@example.com',
    content: 'Oppenheimer was incredible! Such a masterpiece by Nolan.',
    createdAt: new Date('2024-01-14T16:45:00Z').toISOString(),
    likes: 8
  }
]

let analytics = {
  totalViews: 4240,
  totalPosts: posts.length,
  totalComments: comments.length,
  todayViews: 150,
  todayVisitors: 89,
  popularPosts: posts.slice().sort((a, b) => b.views - a.views).slice(0, 3),
  categoryStats: [
    { category: 'Technology', count: 1, views: 1250 },
    { category: 'Entertainment', count: 1, views: 890 },
    { category: 'Viral', count: 1, views: 2100 }
  ]
}

// API Routes

// Get all posts
app.get('/api/posts', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const category = req.query.category
    const search = req.query.search
    
    let filteredPosts = posts
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    if (search) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }
    
    const total = filteredPosts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
    
    res.json({
      success: true,
      data: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get single post
app.get('/api/posts/:id', (req, res) => {
  try {
    const post = posts.find(p => p.id === req.params.id)
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }
    
    // Increment views
    post.views += 1
    analytics.totalViews += 1
    analytics.todayViews += 1
    
    res.json({ success: true, data: post })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get comments for a post
app.get('/api/posts/:id/comments', (req, res) => {
  try {
    const postComments = comments.filter(c => c.postId === req.params.id)
    res.json({ success: true, data: postComments })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Add comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
  try {
    const { author, email, content } = req.body
    
    if (!author || !email || !content) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }
    
    const newComment = {
      id: uuidv4(),
      postId: req.params.id,
      author,
      email,
      content,
      createdAt: new Date().toISOString(),
      likes: 0
    }
    
    comments.push(newComment)
    analytics.totalComments += 1
    post = posts.find(p => p.id === req.params.id)
    if (post) {
      post.comments += 1
    }
    
    res.status(201).json({ success: true, data: newComment })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Like a comment
app.post('/api/comments/:id/like', (req, res) => {
  try {
    const comment = comments.find(c => c.id === req.params.id)
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' })
    }
    
    comment.likes += 1
    res.json({ success: true, data: comment })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get analytics
app.get('/api/analytics', (req, res) => {
  try {
    res.json({ success: true, data: analytics })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Add new post (admin)
app.post('/api/posts', (req, res) => {
  try {
    const { title, excerpt, content, category, image, author, tags } = req.body
    
    if (!title || !excerpt || !content || !category || !author) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' })
    }
    
    const newPost = {
      id: uuidv4(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      excerpt,
      content,
      category,
      image: image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60',
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author,
      tags: tags || []
    }
    
    posts.unshift(newPost)
    analytics.totalPosts += 1
    analytics.popularPosts = posts.slice().sort((a, b) => b.views - a.views).slice(0, 3)
    
    // Update category stats
    const categoryIndex = analytics.categoryStats.findIndex(c => c.category === category)
    if (categoryIndex > -1) {
      analytics.categoryStats[categoryIndex].count += 1
    } else {
      analytics.categoryStats.push({ category, count: 1, views: 0 })
    }
    
    res.status(201).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Update post (admin)
app.put('/api/posts/:id', (req, res) => {
  try {
    const postIndex = posts.findIndex(p => p.id === req.params.id)
    if (postIndex === -1) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }
    
    const { title, excerpt, content, category, image, author, tags } = req.body
    
    posts[postIndex] = {
      ...posts[postIndex],
      title: title || posts[postIndex].title,
      excerpt: excerpt || posts[postIndex].excerpt,
      content: content || posts[postIndex].content,
      category: category || posts[postIndex].category,
      image: image || posts[postIndex].image,
      author: author || posts[postIndex].author,
      tags: tags || posts[postIndex].tags,
      updatedAt: new Date().toISOString()
    }
    
    res.json({ success: true, data: posts[postIndex] })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Delete post (admin)
app.delete('/api/posts/:id', (req, res) => {
  try {
    const postIndex = posts.findIndex(p => p.id === req.params.id)
    if (postIndex === -1) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }
    
    // Remove related comments
    comments = comments.filter(c => c.postId !== req.params.id)
    
    // Update analytics
    analytics.totalPosts -= 1
    analytics.totalComments -= posts[postIndex].comments
    
    // Update category stats
    const categoryIndex = analytics.categoryStats.findIndex(c => c.category === posts[postIndex].category)
    if (categoryIndex > -1) {
      analytics.categoryStats[categoryIndex].count -= 1
      analytics.categoryStats[categoryIndex].views -= posts[postIndex].views
    }
    
    posts.splice(postIndex, 1)
    
    res.json({ success: true, message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})
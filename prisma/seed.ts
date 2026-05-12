import { PrismaClient, Role, Visibility, ModelCategory, AssetType, GenerationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@crafthub.ai' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@crafthub.ai',
      password: '$2a$12$LQv3c1yqBo9SkvXS7QTJPOoGz3.Y1jLHiYPFKNOqGHMFWcpdK3Aai',
      role: Role.ADMIN,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@crafthub.ai' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'user@crafthub.ai',
      password: '$2a$12$LQv3c1yqBo9SkvXS7QTJPOoGz3.Y1jLHiYPFKNOqGHMFWcpdK3Aai',
      role: Role.USER,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  });

  console.log('✅ Users created');

  // Create projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Brand Identity',
        description: 'Logo and brand asset generation for startup',
        visibility: Visibility.PRIVATE,
        ownerId: user.id,
      },
    }),
    prisma.project.create({
      data: {
        name: 'Product Photography',
        description: 'AI-generated product shots for e-commerce',
        visibility: Visibility.PUBLIC,
        ownerId: user.id,
      },
    }),
    prisma.project.create({
      data: {
        name: 'Video Storyboard',
        description: 'Storyboard frames for marketing video',
        visibility: Visibility.TEAM,
        ownerId: admin.id,
      },
    }),
    prisma.project.create({
      data: {
        name: 'Audio Experiments',
        description: 'Exploring AI-generated sound effects',
        visibility: Visibility.PRIVATE,
        ownerId: admin.id,
      },
    }),
  ]);

  console.log('✅ Projects created');

  // Create prompts
  const prompts = await Promise.all([
    prisma.prompt.create({
      data: {
        title: 'Minimalist Logo',
        content: 'A minimalist logo design for a tech startup, clean lines, modern typography, single color palette',
        negativePrompt: 'complex, cluttered, vintage, retro',
        tags: JSON.stringify(['logo', 'minimalist', 'tech']),
        ownerId: user.id,
        projectId: projects[0].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Product on White',
        content: 'Professional product photography on pure white background, soft shadows, studio lighting, 4K resolution',
        negativePrompt: 'blurry, dark, noisy, low quality',
        tags: JSON.stringify(['product', 'photography', 'studio']),
        ownerId: user.id,
        projectId: projects[1].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Cinematic Portrait',
        content: 'Cinematic portrait with dramatic lighting, shallow depth of field, film grain, moody atmosphere',
        tags: JSON.stringify(['portrait', 'cinematic', 'dramatic']),
        ownerId: user.id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Fantasy Landscape',
        content: 'Epic fantasy landscape with floating islands, waterfalls, magical aurora in the sky, ultra detailed',
        negativePrompt: 'modern buildings, cars, technology',
        tags: JSON.stringify(['landscape', 'fantasy', 'epic']),
        ownerId: admin.id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Isometric Room',
        content: 'Isometric view of a cozy room, pixel art style, warm lighting, detailed furniture',
        tags: JSON.stringify(['isometric', 'pixel-art', 'interior']),
        ownerId: user.id,
        projectId: projects[0].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Abstract Waves',
        content: 'Abstract fluid art with vibrant gradient colors, smooth flowing waves, high contrast',
        tags: JSON.stringify(['abstract', 'fluid', 'colorful']),
        ownerId: admin.id,
        projectId: projects[2].id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Retro Futurism',
        content: 'Retro futuristic cityscape, neon lights, synthwave aesthetic, chrome and glass buildings',
        negativePrompt: 'natural, organic, rustic',
        tags: JSON.stringify(['retro', 'futurism', 'neon']),
        ownerId: user.id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: 'Nature Macro',
        content: 'Extreme macro photography of a dewdrop on a leaf, crystal clear, morning light, bokeh background',
        tags: JSON.stringify(['macro', 'nature', 'photography']),
        ownerId: admin.id,
        projectId: projects[3].id,
      },
    }),
  ]);

  console.log('✅ Prompts created');

  // Create AI models
  const models = await Promise.all([
    prisma.aiModel.create({
      data: {
        name: 'Aurora Image XL',
        slug: 'aurora-image-xl',
        description: 'High-quality image generation model with excellent prompt following and detail rendering',
        provider: 'mock',
        category: ModelCategory.IMAGE,
        isFeatured: true,
        parameters: JSON.stringify({ aspectRatio: ['1:1', '16:9', '9:16'], steps: { min: 20, max: 50, default: 30 }, guidanceScale: { min: 1, max: 20, default: 7.5 } }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Aurora Image Fast',
        slug: 'aurora-image-fast',
        description: 'Fast image generation optimized for speed while maintaining good quality',
        provider: 'mock',
        category: ModelCategory.IMAGE,
        isFeatured: false,
        parameters: JSON.stringify({ aspectRatio: ['1:1', '16:9'], steps: { min: 4, max: 8, default: 4 }, guidanceScale: { min: 1, max: 10, default: 3 } }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'FrameForge Video',
        slug: 'frameforge-video',
        description: 'Text-to-video generation with smooth motion and cinematic quality',
        provider: 'mock',
        category: ModelCategory.VIDEO,
        isFeatured: true,
        parameters: JSON.stringify({ duration: { min: 2, max: 10, default: 4 }, fps: [24, 30], resolution: ['720p', '1080p'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'FrameForge Animate',
        slug: 'frameforge-animate',
        description: 'Image-to-video animation with natural motion synthesis',
        provider: 'mock',
        category: ModelCategory.VIDEO,
        isFeatured: false,
        parameters: JSON.stringify({ duration: { min: 2, max: 6, default: 3 }, fps: [24], motion: ['subtle', 'moderate', 'dynamic'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'EchoVoice Studio',
        slug: 'echovoice-studio',
        description: 'High-fidelity text-to-speech with multiple voice styles and emotions',
        provider: 'mock',
        category: ModelCategory.AUDIO,
        isFeatured: true,
        parameters: JSON.stringify({ voice: ['neutral', 'warm', 'energetic', 'calm'], speed: { min: 0.5, max: 2, default: 1 }, format: ['mp3', 'wav'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'EchoVoice SFX',
        slug: 'echovoice-sfx',
        description: 'AI-generated sound effects from text descriptions',
        provider: 'mock',
        category: ModelCategory.AUDIO,
        isFeatured: false,
        parameters: JSON.stringify({ duration: { min: 1, max: 30, default: 5 }, format: ['mp3', 'wav'], quality: ['standard', 'high'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'TextPilot Pro',
        slug: 'textpilot-pro',
        description: 'Advanced text generation with creative writing, summarization, and analysis capabilities',
        provider: 'mock',
        category: ModelCategory.TEXT,
        isFeatured: true,
        parameters: JSON.stringify({ maxTokens: { min: 100, max: 4000, default: 1000 }, temperature: { min: 0, max: 2, default: 0.7 }, topP: { min: 0, max: 1, default: 0.9 } }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'TextPilot Code',
        slug: 'textpilot-code',
        description: 'Specialized code generation and analysis model',
        provider: 'mock',
        category: ModelCategory.TEXT,
        isFeatured: false,
        parameters: JSON.stringify({ maxTokens: { min: 100, max: 8000, default: 2000 }, temperature: { min: 0, max: 1, default: 0.2 }, language: ['typescript', 'python', 'rust', 'go'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Aurora Upscale',
        slug: 'aurora-upscale',
        description: 'Image upscaling with AI enhancement, up to 4x resolution increase',
        provider: 'mock',
        category: ModelCategory.IMAGE,
        isFeatured: false,
        parameters: JSON.stringify({ scale: [2, 4], denoise: { min: 0, max: 1, default: 0.5 }, format: ['png', 'webp'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'Aurora Inpaint',
        slug: 'aurora-inpaint',
        description: 'Intelligent image inpainting and editing with mask-based generation',
        provider: 'mock',
        category: ModelCategory.IMAGE,
        isFeatured: false,
        parameters: JSON.stringify({ steps: { min: 20, max: 50, default: 30 }, guidanceScale: { min: 1, max: 20, default: 7.5 }, maskBlur: { min: 0, max: 10, default: 4 } }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'FrameForge Morph',
        slug: 'frameforge-morph',
        description: 'Smooth morphing transitions between two images',
        provider: 'mock',
        category: ModelCategory.VIDEO,
        isFeatured: false,
        parameters: JSON.stringify({ frames: { min: 12, max: 60, default: 24 }, fps: [24, 30], easing: ['linear', 'ease-in', 'ease-out'] }),
      },
    }),
    prisma.aiModel.create({
      data: {
        name: 'EchoVoice Music',
        slug: 'echovoice-music',
        description: 'AI music generation from text descriptions with multiple genres',
        provider: 'mock',
        category: ModelCategory.AUDIO,
        isFeatured: false,
        parameters: JSON.stringify({ duration: { min: 10, max: 120, default: 30 }, genre: ['ambient', 'electronic', 'classical', 'jazz'], tempo: { min: 60, max: 180, default: 120 } }),
      },
    }),
  ]);

  console.log('✅ AI Models created');

  // Create generations
  const generations = await Promise.all([
    prisma.generation.create({
      data: {
        prompt: 'A minimalist logo design for a tech startup',
        status: GenerationStatus.SUCCEEDED,
        provider: 'mock',
        modelId: models[0].id,
        projectId: projects[0].id,
        ownerId: user.id,
        parameters: JSON.stringify({ aspectRatio: '1:1', steps: 30 }),
        resultUrls: JSON.stringify(['https://placehold.co/512x512/6d28d9/ffffff?text=Logo']),
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Professional product photography on white background',
        status: GenerationStatus.SUCCEEDED,
        provider: 'mock',
        modelId: models[0].id,
        projectId: projects[1].id,
        ownerId: user.id,
        parameters: JSON.stringify({ aspectRatio: '1:1', steps: 30 }),
        resultUrls: JSON.stringify(['https://placehold.co/512x512/4f46e5/ffffff?text=Product']),
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Cinematic portrait with dramatic lighting',
        status: GenerationStatus.RUNNING,
        provider: 'mock',
        modelId: models[0].id,
        ownerId: user.id,
        parameters: JSON.stringify({ aspectRatio: '9:16', steps: 40 }),
        resultUrls: '[]',
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Epic fantasy landscape with floating islands',
        status: GenerationStatus.QUEUED,
        provider: 'mock',
        modelId: models[0].id,
        ownerId: admin.id,
        parameters: JSON.stringify({ aspectRatio: '16:9', steps: 50 }),
        resultUrls: '[]',
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Short promotional video for tech product',
        status: GenerationStatus.SUCCEEDED,
        provider: 'mock',
        modelId: models[2].id,
        projectId: projects[2].id,
        ownerId: admin.id,
        parameters: JSON.stringify({ duration: 4, fps: 24 }),
        resultUrls: JSON.stringify(['https://placehold.co/1920x1080/6d28d9/ffffff?text=Video']),
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Ambient background music for meditation app',
        status: GenerationStatus.FAILED,
        provider: 'mock',
        modelId: models[4].id,
        projectId: projects[3].id,
        ownerId: admin.id,
        parameters: JSON.stringify({ duration: 30, genre: 'ambient' }),
        resultUrls: '[]',
        errorMessage: 'Mock error: Generation timed out',
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Retro futuristic cityscape with neon lights',
        status: GenerationStatus.SUCCEEDED,
        provider: 'mock',
        modelId: models[0].id,
        ownerId: user.id,
        parameters: JSON.stringify({ aspectRatio: '16:9', steps: 35 }),
        resultUrls: JSON.stringify(['https://placehold.co/1024x576/4f46e5/ffffff?text=City']),
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Nature macro dewdrop on leaf',
        status: GenerationStatus.CANCELED,
        provider: 'mock',
        modelId: models[0].id,
        ownerId: admin.id,
        parameters: JSON.stringify({ aspectRatio: '1:1', steps: 40 }),
        resultUrls: '[]',
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Abstract fluid art with vibrant colors',
        status: GenerationStatus.SUCCEEDED,
        provider: 'mock',
        modelId: models[1].id,
        projectId: projects[0].id,
        ownerId: user.id,
        parameters: JSON.stringify({ aspectRatio: '1:1', steps: 4 }),
        resultUrls: JSON.stringify(['https://placehold.co/512x512/ec4899/ffffff?text=Abstract']),
      },
    }),
    prisma.generation.create({
      data: {
        prompt: 'Isometric cozy room pixel art',
        status: GenerationStatus.SUCCEEDED,
        provider: 'mock',
        modelId: models[0].id,
        projectId: projects[0].id,
        ownerId: user.id,
        parameters: JSON.stringify({ aspectRatio: '1:1', steps: 30 }),
        resultUrls: JSON.stringify(['https://placehold.co/512x512/f59e0b/ffffff?text=Room']),
      },
    }),
  ]);

  console.log('✅ Generations created');

  // Create assets
  await Promise.all([
    prisma.asset.create({ data: { name: 'Logo v1', url: 'https://placehold.co/512x512/6d28d9/ffffff?text=Logo+v1', type: AssetType.IMAGE, projectId: projects[0].id, ownerId: user.id, tags: JSON.stringify(['logo', 'brand']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Logo v2', url: 'https://placehold.co/512x512/4f46e5/ffffff?text=Logo+v2', type: AssetType.IMAGE, projectId: projects[0].id, ownerId: user.id, tags: JSON.stringify(['logo', 'brand', 'final']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Product Shot 1', url: 'https://placehold.co/1024x1024/0ea5e9/ffffff?text=Product+1', type: AssetType.IMAGE, projectId: projects[1].id, ownerId: user.id, tags: JSON.stringify(['product', 'ecommerce']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Product Shot 2', url: 'https://placehold.co/1024x1024/10b981/ffffff?text=Product+2', type: AssetType.IMAGE, projectId: projects[1].id, ownerId: user.id, tags: JSON.stringify(['product', 'ecommerce']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Promo Video', url: 'https://placehold.co/1920x1080/6d28d9/ffffff?text=Promo', type: AssetType.VIDEO, projectId: projects[2].id, ownerId: admin.id, tags: JSON.stringify(['video', 'promo']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Storyboard Frame 1', url: 'https://placehold.co/1920x1080/f59e0b/ffffff?text=Frame+1', type: AssetType.IMAGE, projectId: projects[2].id, ownerId: admin.id, tags: JSON.stringify(['storyboard', 'frame']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Background Music', url: 'https://placehold.co/400x400/ec4899/ffffff?text=Music', type: AssetType.AUDIO, projectId: projects[3].id, ownerId: admin.id, tags: JSON.stringify(['audio', 'ambient']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'City Neon', url: 'https://placehold.co/1024x576/4f46e5/ffffff?text=City+Neon', type: AssetType.IMAGE, ownerId: user.id, tags: JSON.stringify(['city', 'neon', 'retro']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Abstract Flow', url: 'https://placehold.co/512x512/ec4899/ffffff?text=Flow', type: AssetType.IMAGE, projectId: projects[0].id, ownerId: user.id, tags: JSON.stringify(['abstract', 'colorful']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Pixel Room', url: 'https://placehold.co/512x512/f59e0b/ffffff?text=Pixel', type: AssetType.IMAGE, projectId: projects[0].id, ownerId: user.id, tags: JSON.stringify(['pixel-art', 'isometric']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Design Brief', url: 'https://placehold.co/400x400/64748b/ffffff?text=Doc', type: AssetType.DOCUMENT, projectId: projects[0].id, ownerId: user.id, tags: JSON.stringify(['document', 'brief']), metadata: '{}' } }),
    prisma.asset.create({ data: { name: 'Sound Effect Pack', url: 'https://placehold.co/400x400/10b981/ffffff?text=SFX', type: AssetType.AUDIO, projectId: projects[3].id, ownerId: admin.id, tags: JSON.stringify(['sfx', 'audio', 'pack']), metadata: '{}' } }),
  ]);

  console.log('✅ Assets created');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

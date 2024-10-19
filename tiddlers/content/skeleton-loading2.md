<style>
	.skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-item {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.skeleton-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
  animation: skeleton-loading 1.2s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: drk) {
  .skeleton-item {
    background-color: #333;
  }

  .skeleton-item::before {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
  }
}

</style>

<div class="skeleton">
  <div class="skeleton-item"></div>
  <div class="skeleton-item"></div>
  <div class="skeleton-item"></div>
</div>

import React from 'react'

const PageNotFound = () => {
    return (
        <div>
            <div class="bg-primary">
            <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div class="border-t border-gray-200 text-center pt-8">
                <h1 class="text-9xl font-bold text-secondary">404</h1>
                <h1 class="text-6xl text-secondary font-medium py-8">oops! Page not found 😔</h1>
                    <p class="text-2xl text-secondary pb-8 px-12 font-medium">The page you are looking for does not exist. It might have been moved or deleted.</p>
                </div>
            </div>
            </div>
  </div>
        </div>
    )
}

export default PageNotFound

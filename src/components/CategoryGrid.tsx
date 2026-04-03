// 'use client'

// // import { cn } from '@/lib/utils'
// import { Category } from '@/lib/types'
// import { categories } from '@/data/categories'

// interface CategoryGridProps {
//   active: Category | 'tutte'
//   onChange: (cat: Category | 'tutte') => void
// }

// export default function CategoryGrid({ active, onChange }: CategoryGridProps) {
//   return (
//     <section className="max-w-5xl mx-auto px-6 py-16">
//       <p className="text-[11px] tracking-[3px] uppercase text-zinc-400 mb-2 font-sans">
//         Categorie
//       </p>
//       <h2 className="font-serif text-[30px] text-zinc-900 mb-8">
//         Di cosa hai bisogno?
//       </h2>

//       {/* All button */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         <button
//           onClick={() => onChange('tutte')}
//           className={cn(
//             'text-xs px-4 py-2 rounded-full border transition-all duration-200 font-sans',
//             active === 'tutte'
//               ? 'bg-[#0D1117] text-[#E8D5A3] border-[#0D1117]'
//               : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
//           )}
//         >
//           Tutte le categorie
//         </button>
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => onChange(cat.id)}
//             className={cn(
//               'text-xs px-4 py-2 rounded-full border transition-all duration-200 font-sans',
//               active === cat.id
//                 ? 'bg-[#0D1117] text-[#E8D5A3] border-[#0D1117]'
//                 : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'
//             )}
//           >
//             {cat.icon} {cat.label}
//           </button>
//         ))}
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => onChange(cat.id)}
//             className={cn(
//               'text-left p-5 rounded-xl border transition-all duration-200 group',
//               active === cat.id
//                 ? 'border-[#0D1117] bg-[#0D1117]'
//                 : 'border-zinc-200 hover:border-zinc-400 bg-white'
//             )}
//           >
//             <div className="text-xl mb-3">{cat.icon}</div>
//             <div
//               className={cn(
//                 'text-sm font-medium mb-1 font-sans transition-colors',
//                 active === cat.id ? 'text-[#E8D5A3]' : 'text-zinc-800'
//               )}
//             >
//               {cat.label}
//             </div>
//             <div
//               className={cn(
//                 'text-xs font-sans transition-colors',
//                 active === cat.id ? 'text-white/40' : 'text-zinc-400'
//               )}
//             >
//               {cat.description}
//             </div>
//           </button>
//         ))}
//       </div>
//     </section>
//   )
// }
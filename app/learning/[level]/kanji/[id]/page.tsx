

export default function KanjiDetails() {
  return (
    <div className="space-y-4">
      {/* Header */}
      {/* <div className="bg-white rounded-md">
        <div className="flex items-center gap-4">
          <Button className="p-2 bg-transparent hover:bg-slate-100 rounded-md transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                Bài {lessonById[0].lessonNumber} - {lessonById[0].source}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge className={getLevelColor(lessonById[0].level)}>
                  {lessonById[0].level != 0 ? lessonById[0].level : "N5"}
                </Badge>
                <span className="text-sm text-slate-600">
                  {lessonById[0].grammar.length} mẫu ngữ pháp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Content */}
      <div className="space-y-8">
        {lessonById[0].grammar.map((grammar, index) => (
          <GrammarPatternCard
            key={grammar.id}
            grammar={grammar}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

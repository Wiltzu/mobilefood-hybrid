var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src(
		[
			'src/htdocs/**', 
			'node_modules/bootstrap/fonts/**',
			'node_modules/overthrow/overthrow.js',
		])
		.pipe(gulp.dest('www'));
});
